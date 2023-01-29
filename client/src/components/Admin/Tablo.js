import { Card, CardBody, CardTitle, Table } from "reactstrap";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { DIYETISYENLERI_GETIR } from "../../graphql/queries";
import { useQuery, useMutation } from "@apollo/client";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { DIYETISYEN_SIL } from "../../graphql/mutations";
import Modal from "../Modal/Modal";
import {useState} from 'react';

const Tablo = () => {

  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { loading, data, error, refetch: r1 } = useQuery(DIYETISYENLERI_GETIR);
  const [diyetisyeniSil, { data: d2, loading: l2, error: e2 }] = useMutation(
    DIYETISYEN_SIL,
    {
      onCompleted(data) {
        console.log(data);
        r1();
        if(e2){
          setShow(true)
        }
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

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Diyetisyenler</CardTitle>
          {<Modal show={show} onClose={() => setShow(false)}>
          <h1> Hello World! </h1>
        </Modal>}
          <IconButton
            color="inherit"
            onClick={() => navigate("/DiyetisyenEkle")}
          >
            <PersonAddOutlinedIcon />
          </IconButton>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Ad Soyad</th>
                <th>Telefon</th>
              </tr>
            </thead>
            <tbody>
              {data.diyetisyenKullanicilariListele.map((tdata, index) => (
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

                  <IconButton
                    onClick={() => {
                      diyetisyeniSil({
                        variables: {
                          silinecekDiyetisyenEmail: tdata.email,
                        },
                      });
                    }}
                  >
                    <PersonRemoveOutlinedIcon />
                  </IconButton>
                  <td></td>
                  <IconButton href="DiyetisyenDuzenle">
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
