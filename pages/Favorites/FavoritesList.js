import React from "react";
import axios from 'axios'
import Head from 'next/head'
import styles from "../Favorites/FavoritesList.module.css"
import Navbar from '../Navbar/index'
import SideBar from '../SideBar/Index'
import { useRouter } from 'next/router';
import { descreption } from "../../components/product/StringFunction";
import * as cookie from 'cookie'

const FavoritesList = ({data , tokenCookie}) =>{
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  }
  
  //removing the items from favorites list
  const RemoveHandler = (id) => {
    const parsedCookies = tokenCookie;
    axios.delete(`http://45.159.113.83:800/api/v1/marked/delete/${id}/`, {
        headers:{
          'Authorization': 'Token '+ parsedCookies.token, 
      },
      }).then(response => {if(response.status === 204){
        refreshData();
        console.log(data);
      }})
  } 
   return(
    <div className={styles.container}>
       <Head>
        <title>جزئیات سفارش</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
        <section className={styles.Flex}>
          <section className={styles.main}>
            <section className={styles.Favorites_List_Box}>
              <section className={styles.Header_Favorites_List_Box}>
                <h4 style={{fontSize: '16px'}}>لیست علاقه مندی ها</h4>
              </section>
              <hr /><br />
              <section className={styles.Items_Favorites_List_Box}>
                {data.map(item => 
                   <section key={item.product.id} className={styles.Cards_Favorites_List_Box}>
                   <div className={styles.Cards_Image}>
                     <img src={item.product.image} alt="image" />
                   </div>
                   <hr className={styles.Line} />
                   <div className={styles.Cards_Title}>
                     <p>{item.product.name}</p>
                   </div>
                   <div className={styles.Cards_Detailes}>
                     <p><i className="fas fa-user-check"></i>شرکت سازنده : {item.product.manufacturer_company}</p>
                     <div className="product-des" dangerouslySetInnerHTML={{ __html: descreption(item.product.descreption) + " ..." }}></div>
                     <p style={{textAlign: 'left'}}>{item.product.price} تومان </p>
                   </div>
                   <div className={styles.Buttons_Favorites_List_Box}>
                     <button className={styles.Add_To_Card}>اضافه به سبد خرید</button>
                     <button onClick={() => RemoveHandler(item.id)} className={styles.Remove_From_Favorites}>حذف</button>
                   </div>
                 </section>
                 )}
            </section>
          </section>
          </section>
          <section className={styles.SideBar}>
            <SideBar />
          </section>
          </section>

    </div>
   )
}

//get data from database
export async function getServerSideProps(context){
  const parsedCookies = cookie.parse(context.req.headers.cookie);
  const data = await axios.get(`http://45.159.113.83:800/api/v1/marked/`, {
      headers:{
        'Authorization': 'Token '+ parsedCookies.token, 
    },
    })
    const response = data.data.results

    return{
      props:{data: response , tokenCookie: parsedCookies}
    }
}

export default FavoritesList

