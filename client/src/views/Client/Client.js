/*!

=========================================================
* BLK Design System React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import PageHeader from "components/PageHeader/PageHeader.js";
import Footer from "components/Footer/Footer.js";

// sections for this page/view
import Basics from "views/IndexSections/Basics.js";
import Navbars from "views/IndexSections/Navbars.js";
import Tabs from "views/IndexSections/Tabs.js";
import Pagination from "views/IndexSections/Pagination.js";
import Notifications from "views/IndexSections/Notifications.js";
import Typography from "views/IndexSections/Typography.js";
import JavaScript from "views/IndexSections/JavaScript.js";
import NucleoIcons from "views/IndexSections/NucleoIcons.js";
import Signup from "views/IndexSections/Signup.js";
import Examples from "views/IndexSections/Examples.js";
import Download from "views/IndexSections/Download.js";
import { Container, Row } from "reactstrap";

export default function Client() {
  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  },[]);
  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <div className="squares square1" />
        <div className="squares square2" />
        <div className="squares square3" />
        <div className="squares square4" />
        <div className="squares square5" />
        <div className="squares square6" />
        <div className="squares square7" />
        <div className="main">
          <div className="section section-basic" id="basic-elements">
              <Container>
                <div className="row align-items-start">
                    <div className="col display-4 text-center gray-800">CLIENT(s) PAGE</div>
                </div>
                <div className="row align-items-start">
                    <div className="col-md-4">
                        <div className="card">
                            Client
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            Client
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            Client
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            Client
                        </div>
                    </div>
                </div>
              </Container>
          </div>
        </div>
      </div>
    </>
  );
}
