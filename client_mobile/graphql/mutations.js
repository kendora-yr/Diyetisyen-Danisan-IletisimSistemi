import {gql} from '@apollo/client'

export const GIRISYAP_KULLANICI=gql`
mutation KullaniciGirisYap($kullaniciGiris: KullaniciGirisBilgisi!) {
    KullaniciGirisYap(kullaniciGiris: $kullaniciGiris) {
      token
    }
  }
`

export const GETIR_KULLANICITIPI=gql`
mutation KullaniciTipiGetir($kullaniciGiris2: KullaniciGirisBilgisi!) {
  kullaniciTipiGetir(kullaniciGiris2: $kullaniciGiris2) {
    kullaniciTipi
  }
}`

export const DANISAN_EKLE=gql`
mutation DanisanEkle($yeniDanisan: DanisanBilgisi!) {
  danisanEkle(yeniDanisan: $yeniDanisan) {
    ad
    boy
    diyetisyenId
    cinsiyet
    email
    id
    kilo
    telefon
    yas
  }
}
`

export const DIYETISYEN_EKLE=gql`
mutation Mutation($yeniDiyetisyen: DiyetisyenBilgisi!) {
  diyetisyenEkle(yeniDiyetisyen: $yeniDiyetisyen) {
    ad
    email
    telefon
  }
}
`

export const DANISANKULLANICIID_GETIR=gql`
mutation Mutation($danisanId: Int!) {
  danisanKullaniciIdGetir(danisanId: $danisanId) {
    kullaniciId
    danisanId
  }
}
`

export const MESAJ_EKLE=gql`
mutation Mutation($aliciId: Int!, $metin: String!) {
  mesajEkle(aliciId: $aliciId, metin: $metin) {
    aliciId
    gondericiId
    id
    metin
    olusturmaTarihi
  }
}
`

export const DANISAN_SIL=gql`
mutation DanisanSil($silinecekDanisanId: Int!) {
  danisanSil(silinecekDanisanId: $silinecekDanisanId)
}
`