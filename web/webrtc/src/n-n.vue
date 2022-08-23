<script setup>
import { ref, onMounted } from 'vue';
import io from "socket.io-client";

const PC_CONFIG = {
    iceServers: [
        {
            urls: "stun:stun.l.google.com:19302",
        },
    ],
};
const SOCKET_SERVER_URL = "http://localhost:8080";


const isConnectedVideo = ref(false);
const videoStream = ref();
const videoElement = ref();
const connectLoading = ref(false);

const socketInfo = ref();
const pcsRef = ref({});
const users = ref([]);
const roomNo = ref();

if (!window.logs) {
    window.logs = [];
}

console.log = function (text) {
    window.logs.push({
        time: new Date().toISOString(),
        message: text,
    })
    console.info(new Date().toISOString(), text);
}

const setUsers = (callback) => {
    console.log('Save user')
    let newUsers = callback && callback(users.value);
    users.value = newUsers;
}

const connectVideo = async () => {
    if (connectLoading.value) return;

    connectLoading.value = true;
    navigator.mediaDevices.getUserMedia({ audio: false, video: true }).then(stream => {
        isConnectedVideo.value = true;
        videoElement.value.srcObject = stream;
        videoElement.value.onloadedmetadata = () => {
            videoElement.value.play();
        };

        videoStream.value = stream;
        socketInfo.value.emit("join_room", {
            room: roomNo.value,
            email: 'test@example.com',
        });
    }).catch(err => {
        alert(err.name + ': ' + err.message);
    }).finally(() => {
        connectLoading.value = false;
    });
}

const createPeerConnection = (socketID, email) => {
    console.log(`Create Per: ${socketID}, ${email}`)
    try {
        const pc = new RTCPeerConnection(PC_CONFIG);
        pc.onicecandidate = (e) => {
            if (!(socketInfo.value && e.candidate)) return;
            console.log('Emit candidate');
            socketInfo.value.emit('candidate', {
                candidate: e.candidate,
                candidateSendID: socketInfo.value.id,
                candidateReceiveID: socketID,
            });
        };

        pc.oniceconnectionstatechange = (e) => {
            console.log('On ice state change');
        };

        pc.ontrack = (e) => {
            console.log('ontrack success');
            setUsers((oldUsers) =>
                oldUsers
                    .filter((user) => user.id !== socketID)
                    .concat({
                        id: socketID,
                        email,
                        stream: e.streams[0],
                    }),
            );
        };

        if (videoStream.value) {
            console.log('localstream add');
            videoStream.value.getTracks().forEach((track) => {
                if (!videoStream.value) return;
                pc.addTrack(track, videoStream.value);
            });
        } else {
            console.log('no local stream');
        }

        return pc;
    } catch (e) {
        console.error(e);
        return undefined;
    }
}

const joinRoom = () => {
    if (!roomNo.value) return;

    socketInfo.value.disconnect();
    socketInfo.value.connect();
    pcsRef.value = [];
    users.value = [];

    connectVideo();
}

const leaveRoom = () => {
    socketInfo.value.disconnect();
    pcsRef.value = [];
    users.value = [];
    videoStream.value.getTracks().forEach(track => {
        track.stop();
    });
}

onMounted(() => {
    socketInfo.value = io(SOCKET_SERVER_URL);

    socketInfo.value.on('connect', () => {
        console.log('Socket Id: ' + socketInfo.value.id);
    })

    socketInfo.value.on('all_users', (allUsers) => {
        allUsers.forEach(async (user) => {
            if (!videoStream.value) return;
            const pc = createPeerConnection(user.id, user.email);
            if (!(pc && socketInfo.value)) return;
            pcsRef.value = { ...pcsRef.value, [user.id]: pc };
            try {
                const localSdp = await pc.createOffer({
                    offerToReceiveAudio: true,
                    offerToReceiveVideo: true,
                });
                console.log('create offer success');
                await pc.setLocalDescription(new RTCSessionDescription(localSdp));
                socketInfo.value.emit('offer', {
                    sdp: localSdp,
                    offerSendID: socketInfo.value.id,
                    offerSendEmail: 'offerSendSample@sample.com',
                    offerReceiveID: user.id,
                });
            } catch (e) {
                console.error(e);
            }
        });
    });

    socketInfo.value.on(
        'getOffer',
        async (data) => {
            const { sdp, offerSendID, offerSendEmail } = data;
            console.log('get offer');
            if (!videoStream.value) return;
            const pc = createPeerConnection(offerSendID, offerSendEmail);
            if (!(pc && socketInfo.value)) return;
            pcsRef.value = { ...pcsRef.value, [offerSendID]: pc };
            try {
                await pc.setRemoteDescription(new RTCSessionDescription(sdp));
                console.log('answer set remote description success');
                const localSdp = await pc.createAnswer({
                    offerToReceiveVideo: true,
                    offerToReceiveAudio: true,
                });
                await pc.setLocalDescription(new RTCSessionDescription(localSdp));
                socketInfo.value.emit('answer', {
                    sdp: localSdp,
                    answerSendID: socketInfo.value.id,
                    answerReceiveID: offerSendID,
                });
            } catch (e) {
                console.error(e);
            }
        },
    );

    socketInfo.value.on(
        'getAnswer',
        (data) => {
            const { sdp, answerSendID } = data;
            console.log('get answer');
            const pc = pcsRef.value[answerSendID];
            if (!pc) return;
            pc.setRemoteDescription(new RTCSessionDescription(sdp));
        },
    );

    socketInfo.value.on(
        'getCandidate',
        async (data) => {
            console.log('get candidate');
            const pc = pcsRef.value[data.candidateSendID];
            if (!pc) return;
            await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
            console.log('candidate add success');
        },
    );

    socketInfo.value.on('user_exit', (data) => {
        if (!pcsRef.value[data.id]) return;
        pcsRef.value[data.id].close();
        delete pcsRef.value[data.id];
        setUsers((oldUsers) => oldUsers.filter((user) => user.id !== data.id));
    });

    socketInfo.value.on("room_full", () => {
        console.log('room full')
    })
})
</script>

<template>
    <div class="actions">
        <input v-model="roomNo" />
        <div class="mt">
            <button :disabled="connectLoading" class="mr" @click="joinRoom">Join Room</button>
            <button :disabled="connectLoading" @click="leaveRoom">Leave Room</button>
        </div>
    </div>
    <div class="meta">
        <video ref="videoElement" autoplay></video>
    </div>
    <div>
        <div>
            <video v-for="(user, i) in users" :key="i" :srcObject="user.stream" autoplay></video>
        </div>
    </div>
</template>

<style scoped>
.actions {
    text-align: left;
}

video {
    width: 500px;
    height: 300px;
    margin-top: 10px;
    background: black;
    margin-right: 10px;
}

.meta video {
    width: 260px;
    height: 156px;
    border: 1px solid black;
}
</style>
