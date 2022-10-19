import React from "react";
import styles from "./OrderHistory.module.scss";
import shoes from "../../images/zara-ayakkabi.jpg";
import phone_1 from "../../images/IPHONE-11.png";
import phone_2 from "../../images/iphone_12.png";
import phone_3 from "../../images/iphone-11-red.jpeg";

function OrderHistory() {
  return (
    <section>
      <section>
        <div className={`container mx-auto ${styles.order}`}>
          <h2 className="text-2xl">Sipariş Geçmişiniz</h2>
          <br />
          <>
            <div className={styles.table}>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Ürün</th>
                    <th>Sipariş Tarihi</th>
                    <th>Sipariş ID</th>
                    <th>Sipariş Durumu</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      <img
                        src={shoes}
                        style={{ width: "150px", height: "120px" }}
                      />
                    </td>
                    <td>19.10.2022 14:53</td>
                    <td>Brr5dSjt3adYkUPqi00Z</td>
                    <td>
                      <p className="text-blue-500">Bekliyor</p>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>
                      <img
                        src={phone_1}
                        style={{ width: "150px", height: "120px" }}
                      />
                    </td>
                    <td>19.10.2022 14:53</td>
                    <td>Brr5dSjt3adYkUPqi00Z</td>
                    <td>
                      <p className="text-green-500">Onaylandı</p>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>
                      {" "}
                      <img
                        src={phone_2}
                        style={{ width: "150px", height: "120px" }}
                      />
                    </td>
                    <td>19.10.2022 14:53</td>
                    <td>Brr5dSjt3adYkUPqi00Z</td>
                    <td>
                      <p className="text-red-500">Reddedildi</p>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>
                      <img
                        src={phone_3}
                        style={{
                          width: "100px",
                          height: "120px",
                          marginLeft: "25px",
                        }}
                      />
                    </td>
                    <td>19.10.2022 14:53</td>
                    <td>Brr5dSjt3adYkUPqi00Z</td>
                    <td>
                      <p className="text-red-500">Reddedildi</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        </div>
      </section>
    </section>
  );
}

export default OrderHistory;
