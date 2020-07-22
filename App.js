import React, { Component } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, ScrollView, Picker, Image} from 'react-native';
import { Input } from 'react-native-elements';
import { Header } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { CheckBox } from 'react-native-elements';
import { Alert } from 'react-native';

export default class App extends Component {

  state = {
    checked: true, //Valeur des cases à cocher
    notChecked: false,
  }
  
  seeAlert() {
    Alert.alert(
      "Question",
      "Etes-vous sur de vouloir valider ?",
      [
      { text: "Annuler", onPress: () => console.log("Appuyé sur annuler"),  style: "cancel"},
      { text: "OK", onPress: "printPDF" }
    ],
      { cancelable: false }
      );
      //Fonction message d'alerte
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }

        console.log(result);
      } catch (E) {
        console.log(E);
      }
    }
    
  render() {

    let { image } = this.state;

  return (
      <ScrollView>
        <View style={styles.container}>
          <Header centerComponent={{ text: 'Garage Solidaire', style: { color: '#fff' }}}/>
          <View>
            <CheckBox center title='Monsieur' checked={this.state.checked}/>
            <CheckBox center title='Madame' checked={this.state.notChecked}/>
          </View>
          <Input style={styles.firstInput} placeholder='Nom...' leftIcon= {<Icon name='user'size={17}color='#7B8894'/>}/>
          <Input placeholder='Prénom...' leftIcon= {<Icon name='user'size={17}color='#7B8894'/>}/>
          <Input placeholder='Date de naissance...' leftIcon= {<Icon name='calendar'size={17}color='#7B8894'/>}/>
          <Input placeholder='Adresse...' leftIcon= {<Icon name='home'size={17}color='#7B8894'/>}/>
          <Input placeholder='Permis...' leftIcon= {<Icon name='id-card'size={17}color='#7B8894'/>}/>
          <Input placeholder='Contrat de travail...' leftIcon= {<Icon name='pencil-square-o'size={17}color='#7B8894'/>}/>
          <View>
            <CheckBox center title='QPV' checked={this.state.checked}/>
            <CheckBox center title='RSA' checked={this.state.notChecked}/>
          </View>
          <Input placeholder="Carte d'identité..." leftIcon= {<Icon name='address-card'size={17}color='#7B8894'/>}/>
          <Input placeholder='Empreinte banquaire...' leftIcon= {<Icon name='credit-card-alt'size={17}color='#7B8894'/>}/>
          <Picker
              style={{ height: 50, width: '100%', marginTop: 10, marginBottom: 10}}
              onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
              <Picker.Item label="Marque" value="mode" />
              <Picker.Item label="Peugeot" value="pt" />
              <Picker.Item label="Renault" value="rt" />
          </Picker>
          <Picker
              style={{ height: 50, width: '100%', marginTop: 10, marginBottom: 10}}
              onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
              <Picker.Item label="Modèle" value="mode" />
              <Picker.Item label="106" value="p106" />
              <Picker.Item label="206" value="p206" />
          </Picker>
          <Input placeholder='Immatriculation...' leftIcon= {<Icon name='bars'size={17}color='#7B8894'/>}/>
          <Picker
              style={{ height: 50, width: '100%', marginTop: 10, marginBottom: 10 }}
              onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
              <Picker.Item label="Etat" value="mode" />
              <Picker.Item label="Bon état" value="bon" />
              <Picker.Item label="Etat correct" value="correct" />
              <Picker.Item label="Mauvais état" value="mauvais" />
          </Picker>
          <Input placeholder='Kilométrage jour...' leftIcon= {<Icon name='tachometer'size={17}color='#7B8894'/>}/>
          <Input placeholder='Date de départ...' leftIcon= {<Icon name='map-o'size={17}color='#7B8894'/>}/>
          <Input placeholder='Date de retour...' leftIcon= {<Icon name='share'size={17}color='#7B8894'/>}/>
        </View>
        <View>
            <Button title="OBTENIR MON PDF" onPress={this.seeAlert}/>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={this._pickImage} />
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
      </ScrollView>
        );
      }
    }

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  firstInput: {
    marginTop: 20,
  },

});