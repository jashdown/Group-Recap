'use client';

import type { RecapPage } from "@/types/contentful";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { parse } from "marked";
import moment from "moment";
import Link from "next/link";
import React, { useState } from "react";

export const Sidebar = ({pages}: {pages: RecapPage[] | null}) => {
  const [sidebarOpened, setSidebarOpened] = useState(false);

  const toggleSidebar = (event: React.MouseEvent) => {
    event.preventDefault();
    setSidebarOpened((prev) => !prev);
  }
  const closeSidebar = () => setSidebarOpened(false);

  return (
    <div id="sidebar" className={sidebarOpened ? '' : 'inactive'}>
      <div className="inner">

        {/* <!-- Search -->
        <section id="search" className="alt">
          <form method="post" action="#">
            <input type="text" name="query" id="query" placeholder="Search" />
          </form>
        </section> */}

        {/* <!-- Menu --> */}
        <nav id="menu">
          <header className="major">
            <h2 className="w-full">Menu<span className="float-right"><a href="#" className="fas fa-times" onClick={closeSidebar}></a></span></h2>
          </header>
          <ul>
            <li><Link href="/" onClick={closeSidebar}>Homepage</Link></li>
          </ul>
        </nav>

        {/* <!-- Section --> */}
        {pages && pages.length > 0 && (
          <section>
            <header className="major">
              <h2>Recent Discussions</h2>
            </header>
            <div className="mini-posts">
              {pages.map((page) => {
                const { fields, sys } = page;
                const { slug, date, bookOfTheBible, chapter, notes, notesMarkdown } = fields;
                const notesAsText = notes ? documentToPlainTextString(notes) : notesMarkdown ? parse(notesMarkdown, { async: false }).replace(/<\/?[^>]+(>|$)/g, "") : '';
                return (
                  <article key={sys.id}>
                    <Link href={`/${slug}`} onClick={closeSidebar}>{bookOfTheBible} {chapter}{date && <span> - {moment(date).format('MMMM Do, YYYY')}</span>}</Link>
                    <p>{notesAsText.substring(0, 180)}...</p>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* <!-- Section --> */}
        <section>
          <header className="major">
            <h2>Get in touch</h2>
          </header>
          <p>Want to join the group?</p>
          <ul className="contact">
            <li className="icon solid fa-envelope"><a href="https://grangerchurch.com/groupdetails/?id=7734">Contact Us</a></li>
          </ul>
        </section>

        {/* <!-- Footer --> */}
        <footer id="footer">
          <p className="copyright">&copy; All rights reserved. Design: <a href="https://html5up.net">HTML5 UP</a>.</p>
        </footer>

      </div>
      <a href="#sidebar" className="toggle" onClick={toggleSidebar}>Toggle</a>
    </div>
  );
}