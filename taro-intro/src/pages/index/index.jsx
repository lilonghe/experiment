import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image, Input } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import './index.styl'
import imgBanner from '../../assets/index-banner.png';
import imgPet1 from '../../assets/pet-1.png';
import imgPet2 from '../../assets/pet-2.png';

@inject('counterStore')
@observer
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  render() {
    const pets = [
      { id: 1, name: 'lola', sex: 1, photo: imgPet1 },
      { id: 2, name: 'bastard', sex: 0, photo: imgPet2 },
      { id: 3, name: 'sfas', sex: 1, photo: imgPet1 },
    ];
    const { counterStore: { counter } } = this.props
    return (
      <View className='index'>
        <Image
          className="banner"
          src={imgBanner}
        />
        <View className="index-content">
          <View className="search-tip">
            <Text>Search For A Pet</Text>
          </View>

          <View className="search-wrapper">
            <Input className="search-input" type='text' placeholder='Search' />
            <View className="search-icon"></View>
          </View>

          <View className="pet-list-wrapper">
            <View className="pet-list">
              {pets.map(pet => <View key={pet.id} className="pet-item">
                <Image mode="widthFix" style='width: 100%' src={pet.photo} />
              </View>)}
            </View>
          </View>
        </View>

      </View>
    )
  }
}

export default Index 
