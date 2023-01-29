import {gql} from 'apollo-server-express'

const typeDefs=gql`

    type Query {
        kullanicilar: [Kullanici]
        kullaniciTipi: Int
        danisanKullanicilariListele:[Danisan]
        diyetisyenKullanicilariListele:[Diyetisyen]
        danisanKullaniciIdGetirQuery(danisanId:Int!):Int
        diyetisyenKullaniciIdGetirQuery:Int
        danisanIcinDiyetisyeniniGetir:Diyetisyen
        mesajlariGetirDiyetisyen(danisanId:Int!):[Mesaj]
        mesajlariGetirDanisan:[Mesaj]
    }

    type Mutation{
        danisanEkle(yeniDanisan:DanisanBilgisi!):Danisan
        danisanSil(silinecekDanisanId:Int!):Int
        diyetisyenEkle(yeniDiyetisyen:DiyetisyenBilgisi!):Diyetisyen
        diyetisyenSil(silinecekDiyetisyenEmail:String!):Int
        KullaniciGirisYap(kullaniciGiris:KullaniciGirisBilgisi!):Token
        kullaniciTipiGetir(kullaniciGiris2:KullaniciGirisBilgisi!): KullaniciTipi
        danisanKullaniciIdGetir(danisanId:Int!):KullaniciId
        mesajEkle(aliciId:Int!,metin:String!):Mesaj
        sifreDegistir(sifreSifirlama:sifreSifirlamaBilgileri!):Int
        diyetisyenGuncelle(diyetisyenEmail:String!):Int
        danisanGuncelle(danisanEmail:String!,guncellenecekDanisan:GuncellenecekDanisanBilgisi!):Int
    }

    type Subscription{
        mesajEklendi:Mesaj
    }
    
    scalar Date

    type Mesaj{
        id:ID!
        metin:String!
        aliciId:Int!
        gondericiId:Int!
        olusturmaTarihi:Date!
    }

    type Kullanici{
        id: ID!
        email: String!
        kullaniciTipi:Int!
    }

    input KullaniciGirisBilgisi{
        email:String!
        sifre:String!
    }

    type KullaniciTipi{
        kullaniciTipi:Int
    }

    type Token{
        token: String
    }

    type KullaniciId{
        danisanId:Int
        kullaniciId:Int
    }

    type Danisan{
        id: ID!
        ad:String!
        email:String!
        boy:Int!
        kilo:Int!
        cinsiyet:String!
        yas:Int!
        telefon:String!
        diyetisyenId:Int!
    }

    type Diyetisyen{
        id:ID!
        ad:String!
        email:String!
        telefon:String!
    }

    input sifreSifirlamaBilgileri{
        email:String!
        yeniSifre:String!
        yeniSifreTekrar:String!
    }

    input DanisanBilgisi{
        ad:String!
        sifre:String!
        email:String!
        boy:String!
        kilo:String!
        cinsiyet:String!
        yas:String!
        telefon:String!
    }

    input DiyetisyenBilgisi{
        ad:String!
        sifre:String!
        email:String!
        telefon:String!
    }

    input GuncellenecekDanisanBilgisi{
        ad:String!
        email:String!
        boy:Int!
        yas:Int!
        telefon:String!
    }

`

export default typeDefs