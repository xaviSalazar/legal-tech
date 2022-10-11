// import { useState } from 'react';
// // material
// import { Container, Stack, Typography } from '@mui/material';
// // components
// import Page from '../components/Page';
// import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// // mock
// import PRODUCTS from '../_mock/products';

// // ----------------------------------------------------------------------

// export default function EcommerceShop() {
//   const [openFilter, setOpenFilter] = useState(false);

//   const handleOpenFilter = () => {
//     setOpenFilter(true);
//   };

//   const handleCloseFilter = () => {
//     setOpenFilter(false);
//   };

//   return (
//     <Page title="Dashboard: Products">
//       <Container>
//         <Typography variant="h4" sx={{ mb: 5 }}>
//           Products
//         </Typography>

//         <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
//           <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
//             <ProductFilterSidebar
//               isOpenFilter={openFilter}
//               onOpenFilter={handleOpenFilter}
//               onCloseFilter={handleCloseFilter}
//             />
//             <ProductSort />
//           </Stack>
//         </Stack>

//         <ProductList products={PRODUCTS} />
//         <ProductCartWidget />
//       </Container>
//     </Page>
//   );
//  }

// import React, { useState } from "react";
// import { Logger } from "logging-library";
// import FileViewer from "react-file-viewer";
// import { CustomErrorComponent } from "custom-error";
// import DocViewer from "react-doc-viewer";
// import Docxtemplater from 'docxtemplater';
// import PizZip from 'pizzip';
// import PizZipUtils from 'pizzip/utils/index.js';
// import { saveAs } from 'file-saver';


// const EcommerceShop = () => {
//   function loadFile(url, callback) {
//     PizZipUtils.getBinaryContent(url, callback);
//   }
  
//   const generateDocument = () => {
//     loadFile(
//       // 'https://docxtemplater.com/tag-example.docx',
//       'https://d1d5i0xjsb5dtw.cloudfront.net/AUTORIZACION+MODIFICABLE+.docx',
//       function (error, content) {
//         if (error) {
//           throw error;
//         }
//         var zip = new PizZip(content);
//         var doc = new Docxtemplater(zip, {
//           paragraphLoop: true,
//           linebreaks: true,
//         });
//         doc.setData({
//           first_name: 'Simón Bolívar',
//           last_name: 'Doña',
//           phone: '0652455478',
//           description: 'New Website',
//         });
//         try {
//           // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
//           doc.render();
//         } catch (error) {
//           // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
//           function replaceErrors(key, value) {
//             if (value instanceof Error) {
//               return Object.getOwnPropertyNames(value).reduce(function (
//                 error,
//                 key
//               ) {
//                 error[key] = value[key];
//                 return error;
//               },
//               {});
//             }
//             return value;
//           }
//           console.log(JSON.stringify({ error: error }, replaceErrors));

//           if (error.properties && error.properties.errors instanceof Array) {
//             const errorMessages = error.properties.errors
//               .map(function (error) {
//                 return error.properties.explanation;
//               })
//               .join('\n');
//             console.log('errorMessages', errorMessages);
//             // errorMessages is a humanly readable message looking like this :
//             // 'The tag beginning with "foobar" is unopened'
//           }
//           throw error;
//         }
//         var out = doc.getZip().generate({
//           type: 'blob',
//           mimeType:
//             'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//         }); //Output the document using Data-URI
//         saveAs(out, 'output.docx');
//       }
//     );
//   };

//   return (
//     <div className="p-2">
//       <button onClick={generateDocument}>Generate document</button>
//     </div>
//   );
// };

// export default EcommerceShop;

import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { Container, Stack, Typography } from '@mui/material';


const EcommerceShop=() => {
  const docs = [
    { uri: "https://d1d5i0xjsb5dtw.cloudfront.net/AUTORIZACION+MODIFICABLE+.docx"} 
  ];

  return (<Container>
            <DocViewer  
                pluginRenderers={DocViewerRenderers}
                documents={docs} 
                style={{ height: 700 }}
            />
          </Container>)
}

export default EcommerceShop;