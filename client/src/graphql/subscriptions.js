import {gql} from '@apollo/client'

export const MESAJ_SUB=gql`
subscription Subscription {
    mesajEklendi {
      aliciId
      gondericiId
      id
      metin
      olusturmaTarihi
    }
  }
`