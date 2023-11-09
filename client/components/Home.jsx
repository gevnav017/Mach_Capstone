import React, { useState, useEffect } from "react";

// component imports

// MUI imports
import Carousel from "react-material-ui-carousel";
import { Container, Box, Grid } from "@mui/material";
import Masonry from "@mui/lab/Masonry";

let i = -1;

const MasonryImages = ({ item }) => {
  let imgHeights = [220, 90, 150, 70, 110, 180, 80, 160];

  i++
  let imgHeight = imgHeights[i];

  console.log(imgHeight);

  return (
    <div style={{ width: "200px", height: imgHeight, border: "solid red" }}>
      <img
        srcSet={item.image}
        src={item.image}
        alt={item.title}
        loading="lazy"
        style={{
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

const Home = () => {
  // store the items from db in this state
  const [items, setItems] = useState([]);

  // make axios call here to the API to get all items
  useEffect(() => {}, []);

  const itemsss = [
    {
      // add image url/src within the quotes below
      image:
        "https://assets.bosecreative.com/transform/9e5e1feb-3a48-4d60-bc30-d5e8a733ce85/SB300_Carton_LightOff_RGB?io=width:816,height:667,transform:fit&io=width:816,height:667,transform:fit",
      caption: "Bose Smart Soundbar",
    },
    {
      image:
        "https://www.beatsbydre.com/content/dam/beats/web/product/earbuds/studio-buds-plus/pdp/product-carousel/transparent/pc-studiobudsplus-transparent-case-open-floating.jpg.large.2x.jpg",
      caption: "Beats Studio Buds +",
    },
    {
      image:
        "https://www.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwbf93630f/JBL_Partybox_Encore_MICx2_Detailshot_01_1605x1605px.png?sw=535&sh=535",
      caption: "JBL Partybox Encore",
    },
    {
      image:
        "https://assets.bosecreative.com/transform/e3ccba8d-a876-489e-8245-b9b03b1ff3d4/QCHLE24_MoonstoneBlue_PDP_GALLERY_SF_01__EXCLUSIVE_COLOR_BADGE?quality=100&io=width:816,height:667,transform:fit&io=width:816,height:667,transform:fit",
      caption: "Bose QuietComfort Headphones",
    },
    {
      image:
        "https://www.harmankardon.com/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwf687b0dd/HK_AURA_STUDIO_4_BLACK_HERO_FIRE_41834_x4.jpg?sw=556&sh=680&sm=fit&sfrm=png",
      caption: "Harman Kardon Aura Studio 4",
    },
    {
      image:
        "https://d13o3tuo14g2wf.cloudfront.net/assets%2FAsset+Hierarchy%2FConsumer+Assets%2FAccessories%2FHeadsets%2FHeadband%2FWH-CH720N%2FeComm+Product+Images%2FBlack%2FWH-CH720N_Black_Standard.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kMTNvM3R1bzE0ZzJ3Zi5jbG91ZGZyb250Lm5ldC9hc3NldHMlMkZBc3NldCtIaWVyYXJjaHklMkZDb25zdW1lcitBc3NldHMlMkZBY2Nlc3NvcmllcyUyRkhlYWRzZXRzJTJGSGVhZGJhbmQlMkZXSC1DSDcyME4lMkZlQ29tbStQcm9kdWN0K0ltYWdlcyUyRkJsYWNrJTJGV0gtQ0g3MjBOX0JsYWNrX1N0YW5kYXJkLnBuZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MjE0NTc2MjAwMH19fV19&Signature=YsGEyfDKPQFq8AlkkDanCTTgXoi23mhs6fMIctcYrRWpPl22xnENIgacKy-bGCo2IVFMn7bHUc4fa95eq2k0HOdwizhAWRZP~0v4PM2J7PMz9RWQUwIkO3xGDJSVcQlE-OLQmGO-YARFGMV-HSVUpZneSBabOZIDxCZKD~wCjOCYpgnlshm-f7xu5XKL84Bd8HfZ62TrNB8BDH0OqIuFi7XIXtJ73tgK33VcofCNmt8x1Cc9aRygi8MfCpPKxM735pcFVGpDniBDBMrty5E70wDZwft4WVuD67UiX1V2sJByDh1e~4WEkFn-ScjvGA1LVCap~29eiC4e3JLY5vJ0RQ__&Key-Pair-Id=K37BLT9C6HMMJ0",
      caption: "Sony WH-CH720N Wireless Noise Cancelling Headphones",
    },
    {
      image:
        "https://www.harmankardon.com/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw18afc0c6/HarmanKardon_FLYTWS_Hero.jpg?sw=556&sh=680&sm=fit&sfrm=png",
      caption: "Harman Kardon FLY TWS",
    },
    {
      image:
        "https://assets.bosecreative.com/transform/fdf8da39-58e7-4054-b32d-1d3c4511483a/PHS_Black_006_RGB?io=width:816,height:667,transform:fit&io=width:816,height:667,transform:fit",
      caption: "Bose Portable Smart Speaker",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ minWidth: "400px", p: 3 }}>
      <Box sx={{ mx: "auto" }}>
        <Box>
          <Carousel>
            {itemsss &&
              itemsss.map((item, index) => (
                <Box key={index} sx={{ textAlign: "center" }}>
                  <img
                    src={item.image}
                    alt={item.caption}
                    style={{
                      margin: "auto",
                      width: "600px",
                      height: "600px",
                      backgroundSize: "cover",
                    }}
                  />
                  <p>{item.caption}</p>
                </Box>
              ))}
          </Carousel>
        </Box>

        <Box sx={{ width: 600, minHeight: 450 }}>
          <Masonry columns={4} spacing={2}>
            {itemsss.map((item, index) => (
              <MasonryImages key={index} item={item} />
            ))}
          </Masonry>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
