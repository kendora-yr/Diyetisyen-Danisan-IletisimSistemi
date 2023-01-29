import './App.css';
import GirisEkrani from '../src/components/Genel/GirisEkrani' 
import DiyetisyenPaneli from '../src/components/Diyetisyen/DiyetisyenPaneli' 
import AdminPaneli from '../src/components/Admin/AdminPaneli' 
import DanisanAnaEkran from '../src/components/Danisan/DanisanAnaEkran' 
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { KULLANICITIPI_GETIR } from '../src/graphql/queries';
import SifremiUnuttum from './components/Genel/SifremiUnuttum';

function App() {
  //const [girdiMi,setGirdiMi]=useState(localStorage.getItem('jwt')?true:false)
  const [kullaniciTipi,setKullaniciTipi]=useState(9)
  //const kontrol=1
  //const a = 9
  //const {loading,data,error}=useQuery(KULLANICITIPI_GETIR)
  // if(data){
  //   a = data.kullaniciTipi
  // }
  //console.log(a)

  //console.log(girdiMi)
  // return (
  //   <>
  //   {
  //     girdiMi ? <GirisEkrani />: <AdminPaneli />
  //   }
  //   </>
  // )
  if(kullaniciTipi===0){
    return <AdminPaneli setKullaniciTipi={setKullaniciTipi}/>
  }
  else if(kullaniciTipi===1){
    return <DanisanAnaEkran setKullaniciTipi={setKullaniciTipi}/>
  }
  else if(kullaniciTipi===2){
    return <DiyetisyenPaneli setKullaniciTipi={setKullaniciTipi}/>
  }
  // else if(kullaniciTipi===7){
  //   return <SifremiUnuttum setKullaniciTipi={setKullaniciTipi}/>
  // }
  else{
    return <GirisEkrani setKullaniciTipi={setKullaniciTipi}/>
  }
}

export default App;