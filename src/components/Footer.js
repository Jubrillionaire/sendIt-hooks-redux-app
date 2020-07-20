import React from "react";
import "../styles/footer.css"
function Footer() {
  return (
    <>
    <div className="footer">
      <div>
        <h3>About Us</h3>
        <p>
          SENDit is a parcel/courier service <br/>that delivers orders timely and <br/> 
          efficientlywith an incredible speed
        </p>
      </div>

      <div>
        <h3>Office Address</h3>
        <p>124, anthony way, Lagos State, Nigeria</p>
      </div>

      <div>
        <h3>Working Hours</h3>
        <div>Weekdays: 8am - 6pm</div>
        <div>Weekends: 10am - 4pm</div>
      </div>

    </div>
    </>
  );
}

export default Footer;
