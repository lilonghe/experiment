import PipelineGraph from './PipelineGraph';

function App() {
    return (
        <div className="App">
            <PipelineGraph data={newData} onClick={node => {
                alert(JSON.stringify(node));
            }} />
        </div>
    );
}

export default App;


const newData = [
    {
        "id": "150000200811284166",
        "name": "Nwitl Vonp Gmkjjrgzu Ssqrshjc Mdytsslkx Ljnxdwxhw Cfpleareu"
    },
    {
        "id": "330000198611182687",
        "name": "Osweh Rfwasb Ftnut Ndjsyp Opkqgk",
        previousId: '150000200811284166',
    },
    {
        "id": "33000020020305415X",
        "name": "Odkvxlvtl Xyuqdfzk Ijotlhbtf Dqinkjptl Hwukg",
        serviceId: '330000198611182687',
    },
    {
        "id": "520000199904296848",
        "name": "Xoitifrcc Bmyiuetkmq Rtbz",
        serviceId: '330000198611182687',
    },
    {
        "id": "110000201003241739",
        "name": "Dmmuwb Qdcglr Nngtcnfee",
        serviceId: '330000198611182687',
    },
    {
        "id": "330000200801143590",
        "name": "Erxxfrrugs Jems Tjhb Tqwyown Gmh",
        serviceId: '330000198611182687',
    },
    {
        "id": "450000198706157780",
        "name": "Htipx Mrqoqb Wxwqyoish Icpte Chu Pjbm",
        previousId: '150000200811284166',
        serviceId: '330000198611182687',
    },
    {
        "id": "71000019880425051X",
        "name": "Luocj Jyna Gtpze Vdxniyu Xbihboed Eorkxp",
        previousId: '450000198706157780',
        serviceId: '330000198611182687',
    },
    {
        "id": "520000200107177534",
        "name": "Jdivxjeye Egs Kawv Ypuwx Bzxegswxng",
        serviceId: '330000198611182687',
    },
    {
        "id": "810000201710317275",
        "name": "Pxeokrgjz Okzzy Uvcxpy Olhflbkxzf",
        serviceId: '330000198611182687',
    },
    {
        "id": "650000197001249039",
        "name": "Stptost Ucwezyzgr Pina Ureamtd Uaztopt",
        previousId: '450000198706157780',
    },
    {
        "id": "15000020160715377X",
        "name": "Dhqtbn Xuzcbcj Leoqcs Fmsowek"
    },
];