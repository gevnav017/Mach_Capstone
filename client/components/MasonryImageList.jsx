import React from 'react';

import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';




const MasonryImageList = () => {
    const itemData = [
    {
      img: 'https://assets.bosecreative.com/transform/60ff5b52-623a-43b5-932b-7909382d64b1/QC45_TripleBlack_003_RGB?io=width:816,height:667,transform:fit&io=width:816,height:667,transform:fit',
      title: 'Bose QuietComfort 45 Headphones',
    },
    {
      img: 'https://www.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw6f6cbbb1/JBL_GO_3_HERO_GREY_PINK_0539_x1.png?sw=535&sh=535',
      title: 'JBL Go 3',
    },
    {
      img: 'https://d13o3tuo14g2wf.cloudfront.net/thumbnails%2Fmedium%2FAsset+Hierarchy%2FConsumer+Assets%2FSpeakers%2FWireless+Speakers%2FSRS-XV800%2FeComm+Product+Images%2F2-+SRS-XV800_front_illumination_off.png.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kMTNvM3R1bzE0ZzJ3Zi5jbG91ZGZyb250Lm5ldC90aHVtYm5haWxzJTJGbWVkaXVtJTJGQXNzZXQrSGllcmFyY2h5JTJGQ29uc3VtZXIrQXNzZXRzJTJGU3BlYWtlcnMlMkZXaXJlbGVzcytTcGVha2VycyUyRlNSUy1YVjgwMCUyRmVDb21tK1Byb2R1Y3QrSW1hZ2VzJTJGMi0rU1JTLVhWODAwX2Zyb250X2lsbHVtaW5hdGlvbl9vZmYucG5nLnBuZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MjE0NTc2MjAwMH19fV19&Signature=MXGc4W7Nr3k4Cnws~JCaBYf6c2FJ4X0o-KZ8sZu4Cm7n78WRpd3eHeTfhGU77SlwyD9Nq0ENFxkyq3QF1lTCqpv~LQinEDszcgZol4F9cWFCt3KfAEDRGjTyLnQluc43P5-~YoPXeSif5QvNnL-W07ujE1G0~4FHiNad2TF3-ZpspXcYu7uBVAyYynBT4-x5NxfZoCLULZNeq1eNmwO1OsTrX0xBYjhOdnaNjIAUyy2YbxRls8pWddNUnNWgShYawHUvkvdiO9bRUX~wQ89mzQS3vbnwZctU6QsMc0SrC-kSv84NVtDT51k3iGK1-0vG9VYnP9mVppflER9aCTCuaA__&Key-Pair-Id=K37BLT9C6HMMJ0',
      title: 'Sony XV900',
    },
    {
      img: 'https://d13o3tuo14g2wf.cloudfront.net/assets%2FAsset+Hierarchy%2FConsumer+Assets%2FAccessories%2FHeadphones%2FEarbuds%2F2022%2FWF-LS900N%2FProduct+Images%2FV%2FeComm%2F03_LinkBuds+S_violet_lifestyle+2.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kMTNvM3R1bzE0ZzJ3Zi5jbG91ZGZyb250Lm5ldC9hc3NldHMlMkZBc3NldCtIaWVyYXJjaHklMkZDb25zdW1lcitBc3NldHMlMkZBY2Nlc3NvcmllcyUyRkhlYWRwaG9uZXMlMkZFYXJidWRzJTJGMjAyMiUyRldGLUxTOTAwTiUyRlByb2R1Y3QrSW1hZ2VzJTJGViUyRmVDb21tJTJGMDNfTGlua0J1ZHMrU192aW9sZXRfbGlmZXN0eWxlKzIucG5nIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoyMTQ1NzYyMDAwfX19XX0_&Signature=JTB7Oi25aLSKatkgoYvmeMnkIhlwj7k53~CY47WyQhEWXYEcswakSw1lsPFY4LHAKe1eew-Brm6b7JXs~WapQqHwN1VW9DyWAa5BqU-IY9-LvdqnSuK6yxPl5Djx7HxXBA5E~Dj-WsvijO93K7ZjFWp18clOGMkEGOP1vKgnVkMsOYhUtE-jmjF0lsDDg1YFM-5KZA2U0lwy527ikXn0qf-5rMkpNmavyb4FPR6DJ7hnJe2vk4Uf-zCMVicAruIck9-fMD-B5iQINeNOyVGiA1LCQ7gdLcIb6SuXkZXVWQ5IzlMK2gHL3NbYPY4C6p3OBhgWmUxsG1AxQb2cz3gsNA__&Key-Pair-Id=K37BLT9C6HMMJ0',
      title: 'HK SoundStick 4',
    },
    {
      img: 'https://d13o3tuo14g2wf.cloudfront.net/assets%2FAsset+Hierarchy%2FConsumer+Assets%2FAccessories%2FHeadphones%2FEarbuds%2F2022%2FWF-LS900N%2FProduct+Images%2FB%2FeComm%2F08_Back_Desktop_Tablet.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kMTNvM3R1bzE0ZzJ3Zi5jbG91ZGZyb250Lm5ldC9hc3NldHMlMkZBc3NldCtIaWVyYXJjaHklMkZDb25zdW1lcitBc3NldHMlMkZBY2Nlc3NvcmllcyUyRkhlYWRwaG9uZXMlMkZFYXJidWRzJTJGMjAyMiUyRldGLUxTOTAwTiUyRlByb2R1Y3QrSW1hZ2VzJTJGQiUyRmVDb21tJTJGMDhfQmFja19EZXNrdG9wX1RhYmxldC5wbmciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjIxNDU3NjIwMDB9fX1dfQ__&Signature=HKM~hYb9hXWkb641VjXFwtLdZ25X0nZci7nydswWfXDLRyL0Z9Gwo2akbe1uFvrzMI3V9cOEU9PVHUH8dm6nxugez43AOgNleM0d0uqhGPzv4-5lF0a2adtoieeisfSf8XJ~9UGNh6~l9I4pGF4ZCWYX1iV4sBuoRRTdhmPGnTrE91FT9aMxvgDil17qExlRA~L~1zjS4KXd5q8gE3bD2i~sWh1dMNRDUNpu3qcZMGAYJTZXDleGNcQRiexaD52OFeLhN~gRVKy~cS6I~e1tjYXTNznpJtn9kSoelcPtr8sVThFscK~N33syVGF8egGRfLbYypRVcoUCNiDDQUPOPw__&Key-Pair-Id=K37BLT9C6HMMJ0',
      title: '',
    },
    {
      img: 'https://assets.bosecreative.com/transform/0678f72c-d01b-421a-8ee1-b2253899f88f/QC45_TripleBlk_0098_RGB?io=width:816,height:667,transform:fit&io=width:816,height:667,transform:fit',
      title: '',
    },
    {
      img: 'https://assets.bosecreative.com/transform/70f4e4e0-31a2-4cdf-be7a-ca7542ab0260/PHS_Black_00078_RGB?io=width:816,height:667,transform:fit&io=width:816,height:667,transform:fit',
      title: '',
    },
    {
      img: 'https://d13o3tuo14g2wf.cloudfront.net/assets%2F_default_upload_bucket%2F8.+SRS-NS7_WatchingTablet-Large_1208x1053.jpg?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kMTNvM3R1bzE0ZzJ3Zi5jbG91ZGZyb250Lm5ldC9hc3NldHMlMkZfZGVmYXVsdF91cGxvYWRfYnVja2V0JTJGOC4rU1JTLU5TN19XYXRjaGluZ1RhYmxldC1MYXJnZV8xMjA4eDEwNTMuanBnIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoyMTQ1NzYyMDAwfX19XX0_&Signature=MOK~24IpJJCwW1b7E8e353E08iJ9zyM1BU1mxlSF4yTN~3Tn8QPTwlB4b-hWZqphx5tFwLoS5psWCFDiCFD5Xb9G8wt3vzHS8O26DiudUZkSgZgV8vR~At9BBUo39PyDpKS4Km9SGsMMEPctZGP8xJGSt8ZULqFerkKvGC4wfA6TX~FHIxyZ7aZhiHRMBBFjGb6-NIWIXTDAZp70WlY8IPfkSGYEaVcMJg0CkFtSFoHf08867Xy-BUZ5vQB4IJw8ZRzk2Lkb858BBiyKrR0sfQk7XwKWpL2VISUs10UPGf0SHO3TVZKY7hxIXXd-LL8QHFiUHFGw8HAscYzWR718qg__&Key-Pair-Id=K37BLT9C6HMMJ0',
      title: '',
    },
    {
      img: 'https://assets.bosecreative.com/transform/8f796f23-05bb-4313-99d4-5f58f3e06e0d/QCUHLE24_PDP_GALLERY_SF_BADGE_03?quality=100&io=width:816,height:667,transform:fit&io=width:816,height:667,transform:fit',
      title: '',
    },
    {
      img: 'https://assets.bosecreative.com/transform/a19a55c2-1399-4553-9259-2a51921292d8/SB600_RT_Bundle_Speakers_Stack_RGB?io=width:816,height:667,transform:fit&io=width:816,height:667,transform:fit',
      title: '',
    },
    {
      img: 'https://www.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw7927f395/JBL_JR300BT_Teal_Fold-1605x1605px.png?sw=535&sh=535',
      title: '',
    },
    {
      img: 'https://www.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw4e465f31/JBL_G0_3_ECO_DETAIL_1_CLOUDWHITE_39693_x2.png?sw=535&sh=535',
      title: '',
    },
    
  ];
  return (
        <Box class="center" sx={{ width: 500, height: 450, overflowY: 'scroll' }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {itemData.map((item, index) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}`}
              src={`${item.img}`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );


};

export default MasonryImageList;