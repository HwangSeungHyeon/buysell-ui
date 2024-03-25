// module.exports = {
//   devServer: {
//     port: 8080,
//     proxy: {
//       "/members": {
//         target: "http://localhost:8080",
//         changeOrigin: true,
//         pathRewrite: {
//           "^/members": "",
//         }
//       },
//       "/posts": {
//         target: "http://localhost:8080",
//         changeOrigin: true,
//         pathRewrite: {
//           "^/posts": "",
//         }
//       }
//     }
//   }
// }