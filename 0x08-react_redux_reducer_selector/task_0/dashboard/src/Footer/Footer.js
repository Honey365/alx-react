import React, { useContext } from "react";
import { getFullYear, getFooterCopy } from "../utils/utils";
import {AppContext} from "../App/AppContext";

function Footer() {
    return (
        <AppContext.Consumer>
            {(context) =>
                <footer>
                    {context.user.isLoggedIn && (
                        <p>
                            <a href="#">Contact us</a>
                        </p>
                    )}
                    <p>
                        Copyright {getFullYear()} - {getFooterCopy()}
                    </p>
                </footer>
            }
        </AppContext.Consumer>
    );
}

export default Footer;
