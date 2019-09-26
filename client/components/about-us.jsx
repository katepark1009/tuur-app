// import React from 'react';
// import Card from '@material-ui/core/Card';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
// import { withStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
// // import { fabGithub } from '@fortawesome/free-solid-svg-icons';

// const styles = theme => ({
//   card: {
//     display: 'flex',
//     height: '150px',
//     marginBottom: theme.spacing(2),
//     width: '89%'
//   },
//   cover: {
//     width: '100%',
//     height: '100%',
//     margin: 0
//   },
//   content: {
//     flex: '1 0 auto'
//   },
//   details: {
//     display: 'flex',
//     flexDirection: 'column'
//   },
//   padding: {
//     padding: 0
//   },
//   title: {
//     margin: theme.spacing(2)
//   },
//   back: {
//     position: 'absolute',
//     top: 20,
//     left: '16px',
//     color: '#a49f9f',
//     fontSize: '20px'
//   },
//   icon:{
//     fontSize: '26px',
//     color: '#3A8288'
//   }
// });

// function AboutUs(props) {
//   const { classes } = props;
//   return (
//     <>
//       <Grid container justify="center" style={{ paddingBottom: '80px' }}>
//         <Grid className={classes.back} component={Link} to={'/'}>
//           <KeyboardArrowLeft style={{ fontSize: '40px' }} />
//         </Grid>
//         <Typography variant="h4" className={classes.title}>
//           About us
//         </Typography>

//         <Card className={classes.card}>
//           <Grid container justify="center">
//             <Grid item xs={4}>
//               <CardMedia
//                 className={classes.cover}
//                 image="https://media.licdn.com/dms/image/C5603AQGSKrl7sWK43g/profile-displayphoto-shrink_800_800/0?e=1565827200&v=beta&t=snJfUdGJcvrokijZLr6UoIoXoCFXfjX1PJ6anGeLMM4"
//               />
//             </Grid>
//             <Grid item xs={7}>
//               <CardContent className={classes.content}>
//                 <Typography variant="h5">
//                   Jennifer Ong
//                 </Typography>
//                 <Typography variant="subtitle1" color="textSecondary" className={classes.padding}>
//                   Front-End Developer
//                 </Typography>
//                   <div>
//                     <a className={classes.icon} style={{marginRight: '8px'}} href="https://github.com/jenOng19" target="_blank">
//                       <FontAwesomeIcon icon={faGithub} />
//                     </a>
//                     <a className={classes.icon} href="https://www.linkedin.com/in/jennifer-s-ong/" target="_blank">
//                       <FontAwesomeIcon icon={faLinkedin} />
//                     </a>
//                   </div>
//               </CardContent>
//             </Grid>
//           </Grid>
//         </Card>

//         <Card className={classes.card}>
//           <Grid container justify="center">
//             <Grid item xs={4}>
//               <CardMedia
//                 className={classes.cover}
//                 image="https://i.imgur.com/CsqrQ0Z.jpg"
//               />
//             </Grid>
//             <Grid item xs={7}>
//               <CardContent className={classes.content}>
//                 <Typography variant="h5">
//                   Eric Sung
//                 </Typography>
//                 <Typography variant="subtitle1" color="textSecondary">
//                   Back-End Developer
//                 </Typography>
//                   <div>
//                     <a className={classes.icon} style={{marginRight: '8px'}} href="https://github.com/uncosung" target="_blank">
//                       <FontAwesomeIcon icon={faGithub} />
//                     </a>
//                     <a className={classes.icon} href="https://www.linkedin.com/in/eric-sung-1a7081122/" target="_blank">
//                       <FontAwesomeIcon icon={faLinkedin} />
//                     </a>
//                   </div>
//               </CardContent>
//             </Grid>
//           </Grid>
//         </Card>
//         <Card className={classes.card}>
//           <Grid container justify="center">
//             <Grid item xs={4}>
//               <CardMedia
//                 className={classes.cover}
//                 image="https://media.licdn.com/dms/image/C5603AQFBfsraS_yvZA/profile-displayphoto-shrink_800_800/0?e=1565827200&v=beta&t=seB_qNVCXWiM3EytwvLQ-dbOYtLXUgObLUa_Uw4gDBM"
//               />
//             </Grid>
//             <Grid item xs={7}>
//               <CardContent className={classes.content}>
//                 <Typography variant="h5">
//                   Kate Park
//                 </Typography>
//                 <Typography variant="subtitle1" color="textSecondary">
//                   Front-End Developer
//                 </Typography>
//                   <div>
//                     <a className={classes.icon} style={{marginRight: '8px'}} href="https://github.com/katepark1009" target="_blank">
//                       <FontAwesomeIcon icon={faGithub} />
//                     </a>
//                     <a className={classes.icon} href="https://www.linkedin.com/in/kyeong-hui-park/" target="_blank">
//                       <FontAwesomeIcon icon={faLinkedin} />
//                     </a>
//                   </div>
//               </CardContent>
//             </Grid>
//           </Grid>
//         </Card>
//         <Card className={classes.card}>
//           <Grid container justify="center">
//             <Grid item xs={4}>
//               <CardMedia
//                 className={classes.cover}
//                 image='../images/kev.png'
//               />
//             </Grid>
//             <Grid item xs={7}>
//               <CardContent className={classes.content}>
//                 <Typography variant="h5">
//                   Kevin Yang
//                 </Typography>
//                 <Typography variant="subtitle1" color="textSecondary">
//                   Back-End Developer
//                 </Typography>
//                   <div>
//                     <a className={classes.icon} style={{marginRight: '8px'}} href="https://github.com/kevbot00" target="_blank">
//                       <FontAwesomeIcon icon={faGithub} />
//                     </a>
//                     <a className={classes.icon} href="https://www.linkedin.com/in/kevinyang123" target="_blank">
//                       <FontAwesomeIcon icon={faLinkedin} />
//                     </a>
//                   </div>
//               </CardContent>
//             </Grid>
//           </Grid>
//         </Card>
//       </Grid>
//     </>
//   );
// }

// export default withStyles(styles)(AboutUs);
