import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import { DANISANICINDIYETISYENINI_GETIR } from "../../graphql/queries";
import { useQuery } from "@apollo/client";

export default function Diyetisyenim() {
  const { loading, data, error } = useQuery(DANISANICINDIYETISYENINI_GETIR);

  return (
    <div>
      <Card sx={{ maxWidth: 650, marginLeft: "30%", marginTop: "10%" }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            {data&& <Avatar
              src={`https://avatars.dicebear.com/api/initials/${data.danisanIcinDiyetisyeniniGetir.ad}.svg`}
              sx={{ width: "32px", height: "32px" }}
            />}
          </ListItemAvatar>
          <ListItemText
            primary={
              <React.Fragment>
                {/* <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                diyetisyen ismi */}
                {data && (
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {data.danisanIcinDiyetisyeniniGetir.ad}
                  </Typography>
                )}
                {/* </Typography> */}
              </React.Fragment>
            }
          />
        </ListItem>
        <CardContent>
          {data && (
            <Typography variant="body2" color="text.secondary" label="email">
              <b>Email:</b> {data.danisanIcinDiyetisyeniniGetir.email}
            </Typography>
          )}
          <br></br>
          {data && (
            <Typography variant="body2" color="text.secondary" label="telefon">
              <b>Telefon:</b> {data.danisanIcinDiyetisyeniniGetir.telefon}
            </Typography>
          )}
          {/* <Typography variant="body2" color="text.secondary">
            diyetisyen bilgileri......
          </Typography> */}
        </CardContent>
      </Card>
    </div>
  );
}
