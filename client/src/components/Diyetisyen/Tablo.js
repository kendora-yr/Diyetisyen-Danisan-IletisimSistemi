import { Card, CardBody, CardTitle, Table } from "reactstrap";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import IconButton from "@mui/material/IconButton";
import { useQuery, useMutation } from "@apollo/client";
import { DANISANLARINI_GETIR } from "../../graphql/queries";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { DANISAN_SIL } from "../../graphql/mutations";
import DanisanDuzenle from "./DanisanDuzenle";

const Tablo = () => {
  const [gecis,setGecis]=useState(false)
  const [bilgiler,setBilgiler]=useState({})
  const navigate = useNavigate();
  const { loading, data, error, refetch:r1 } = useQuery(DANISANLARINI_GETIR);
  const [danisaniSil, { data: d2, loading: l2, error: e2 }] = useMutation(
    DANISAN_SIL,
    {
      onCompleted(data) {
        console.log(data);
        r1()
      },
    }
  );

  useEffect(() => {
    r1();
  }, []);

  if (loading) {
    return <Typography>bekleniyor..</Typography>;
  }
  if (data) {
    console.log(data);
  }

  if(gecis){
    return <DanisanDuzenle bilgiler={bilgiler}/>
  }
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Danışanlarım</CardTitle>
          <IconButton color="inherit" onClick={() => navigate("/DanisanEkle")}>
            <PersonAddOutlinedIcon />
          </IconButton>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Ad Soyad</th>
                <th>Telefon</th>
                <th>Cinsiyet</th>
                <th>Yaş</th>
                <th>Boy</th>
                <th>Kilo</th>
              </tr>
            </thead>
            <tbody>
              {data.danisanKullanicilariListele.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata.ad}</h6>
                        <span className="text-muted">{tdata.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{tdata.telefon}</td>
                  <td>{tdata.cinsiyet}</td>
                  <td>{tdata.yas}</td>
                  <td>{tdata.boy}</td>
                  <td>{tdata.kilo}</td>
                  <IconButton
                    onClick={() => {
                      console.log(tdata.id)
                      danisaniSil({
                        variables:{
                          silinecekDanisanId: +tdata.id
                        }
                      })
                    }}
                  >
                    <PersonRemoveOutlinedIcon />
                  </IconButton>
                  <td></td>
                  <IconButton onClick={() => {
                    setGecis(true)
                    setBilgiler({ad:tdata.ad,email:tdata.email,telefon:tdata.telefon,boy:tdata.boy,kilo:tdata.kilo,yas:tdata.yas})
                  }}>
                    <EditOutlinedIcon />
                  </IconButton>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default Tablo;
