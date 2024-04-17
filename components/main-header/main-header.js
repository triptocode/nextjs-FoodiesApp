import Link from 'next/link';
import Image from 'next/image';

import MainHeaderBackground from './main-header-background';
import logoImg from '@/assets/logo-table33.png';
import classes from './main-header.module.css';
import NavLink from './nav-link';

import {Tooltip } from 'antd';

const items = [
  {color:'purple', title: 'Explore Meals with photos', text: 'Browse Meals', link:'/meals'},
  {color:'pink', title:'Community for sharing stories',text: 'Foodies Community', link:'/community'},
  {color:'blue', title:'Refer to Notice board',text: 'Notice', link:'/notice'}
];


export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />

      <header className={classes.header}>

        <Link className={classes.logo} href="/">
          <Image src={logoImg} alt="A plate with food on it" priority />
          <h2>Foodie Table</h2>
        </Link>

        <nav className={classes.nav}>
          <ul>
          {items.map((item) => (
            <Tooltip title={item.title} color={item.color} key={item.color}>              
              <li>
                <NavLink href={item.link}>{item.text}</NavLink>
              </li>
            </Tooltip>
          ))}
          </ul>
        </nav>

      </header>
    </>
  );
}