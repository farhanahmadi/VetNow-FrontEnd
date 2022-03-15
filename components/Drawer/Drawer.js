import { BiGridAlt } from "react-icons/bi";
import {MdAssessment } from "react-icons/md";
import {AiOutlineArrowLeft } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import MenuItem from "./MenuItem";
import Link from "next/link";
import axios from "axios";

export const menuItems = [
//   {
//     name: "داروخانه",
//     to: "/pharmacy",
//     subMenus: [
//       { name: "آنتی بیوتیک ها", to: "pharmacy/antibiotics" },
//       { name: "ویتامین ها", to: "pharmacy/vitemin" },
//       { name: "واکسن", to: /pharmacy/vaccine" },
//       { name: "افزودنی ها", to: "pharmacy/supplementry" },
//       { name: "ضدعفونی کننده ها", to: "pharmacy/disinfectants" },
//     ],
//   },
//   {
//     name: "فروشگاه",
//     to: "/store",
//     subMenus: [
//       { name: "کنسانتره", to: "store/concentrate" },
//       { name: "مکمل ها", to: "store/complement" },
//       { name: "دان آماده (پلت)", to: "store/pellets" },
//       { name: "تجهیزات پرورشی", to: "store/equipments" },
//       { name: "پرندگان زینتی", to: "store/birds" },
//     ],
//   },
//   {
//     name: "جوجه گوشتی",
//     to: "/chick",
//     subMenus: [
//       { name: "راس ۳۰۸", to: "chick/ross308" },
//       { name: "آبراکرز پلاس", to: "chick/arbruckers" },
//       { name: "آرین", to: "chick/arian" },
//       { name: "کاب 500", to: "chick/cobb500" },
//       { name: "هوبارد", to: "chick/hubbards" },
//     ],
//   },
  
  {
    name: "مشاوره",
    slug: "adviser",
    number: 1,
    subMenus: [
      { name: "دامپزشک آنلاین", slug: "adviser/resome" , number: 1},
      { name: "مشاوره پرورشی", slug: "adviser/resome" , number: 1},
      { name: "مشاور تغذیه ای", slug: "adviser/resome" , number: 1},
      { name: "طرح توجیهی و کار آفرینی", slug: "adviser/resome" , number: 1},
    ],
  },
  {
    name: "اتوماسیون",
    slug: "automation",
    number: 1,
    subMenus: [
      { name: "راه اندازی اتوماسیون اختصاصی", slug: "automation/setup" , number: 1},
      { name: "سخت افزار و تجهیزات ایترنت اشیا", slug: "automation/hardware" , number: 1},
      { name: "سیستم های روباتیک", slug: "automation/advice_training" , number: 1},
      { name: "پشتیبانی اتوماسسیون", slug: "automation/support" , number: 1},
    ],
  },
  {
    name: "اخبار و آموزش",
    slug: "news",
    number: 1,
    subMenus: [
      { name: "اخبار صنعت طیور", slug: "news/poultry" , number: 1},
      { name: "منابع آموزشی", slug: "news/source" , number: 1},
      { name: "راه کارهای پرورشی", slug: "news/poultry_solution" , number: 1},
    ],
  },
];

function Drawer() {
  const [data , setData] = useState([])
  const [close, setClose] = useState(true);
  const [open, setOpen] = useState(false);
  let menRef = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (menRef.current) {
        if (!menRef.current.contains(event.target)) {
          setClose(true);
        }
      }
    });
  });
  let profileRef = useRef();
  useEffect(() => {
    axios.get('http://45.159.113.83:800/api/v1/categories/m/').then(response => setData(response.data))
    document.addEventListener("mousedown", (event) => {
      if (profileRef.current) {
        if (!profileRef.current.contains(event.target)) {
          setOpen(false);
        }
      }
    });
  },[]);

  return (
    <>
      <div ref={menRef} className={`sidebar ${close ? "close" : ""}`}>
        <div className="logo-details">
          <Link href="/">
            {<span className="logo-name">ویرا تجارت نوین اسپوتا</span>}
          </Link>
          <div className="dashboard-logo" onClick={() => setClose(!close)}>
            <BiGridAlt style={{ fontSize: "25px" }} />
          </div>
        </div>
        <ul className="nav-links">
          {data.map((menuItem, index) => (
            <MenuItem
              key={index}
              name={menuItem.name}
              to={menuItem.slug}
              subMenus={menuItem.parent || []}
            />
          ))}
           {menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              name={menuItem.name}
              to={menuItem.slug}
              number={menuItem.number}
              subMenus={menuItem.subMenus || []}
            />
          ))}
           {/* {menuItems.map((menuItem , index) =>
            <MenuItem
              key={index}
              name={menuItem.name}
              to={menuItem.to}
              subMenus={menuItem.subMenus || []}
            />
           )} */}
           
        </ul>

        <div
          ref={profileRef}
          className={`profile-details ${open ? "open" : ""}`}
        >
          <div className="profile-content">
            {/* <img  onClick={() => setOpen(!open)}  src={"/favicon.ico"}  alt="Profile"/> */}
            <MdAssessment onClick={() => setOpen(!open)} id="img" />
          </div>

             <Link href="/Profile/profileDetails" >
          <div className="name-job">
               <div className="profile-name"> داشبورد شما </div>
               <div className="job">تنظیمات پروفایل</div>
          </div>
             </Link>

          <div className="profile-logo">
          <Link href="/Profile/profileDetails" >
            <AiOutlineArrowLeft/>
          </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Drawer;
