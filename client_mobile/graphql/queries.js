import {gql} from '@apollo/client'

export const KULLANICITIPI_GETIR=gql`
query Query {
    kullaniciTipi
  }
`

export const DANISANLARINI_GETIR=gql`
query DanisanKullanicilariListele {
  danisanKullanicilariListele {
    ad
    boy
    cinsiyet
    email
    id
    kilo
    telefon
    yas
  }
}
`
export const DIYETISYENLERI_GETIR=gql`
query Query {
  diyetisyenKullanicilariListele {
    ad
    email
    telefon
  }
}
`

export const DANISANKULLANICIID_GETIRQUERY=gql`
query Query($danisanId: Int!) {
  danisanKullaniciIdGetirQuery(danisanId: $danisanId)
}
`

export const DIYETISYENICINMESAJLARI_GETIR=gql`
query Query($danisanId: Int!) {
  mesajlariGetirDiyetisyen(danisanId: $danisanId) {
    aliciId
    gondericiId
    id
    metin
    olusturmaTarihi
  }
}
`

export const DANISANICINMESAJLARI_GETIR=gql`
query Query {
  mesajlariGetirDanisan {
    aliciId
    gondericiId
    metin
    id
    olusturmaTarihi
  }
}
`

export const DIYETISYENKULLANICIID_GETIRQUERY=gql` 
query Query {
  diyetisyenKullaniciIdGetirQuery
}
`

export const DANISANICINDIYETISYENINI_GETIR=gql`
query Query {
  danisanIcinDiyetisyeniniGetir {
    ad
    email
    telefon
    id
  }
}
`