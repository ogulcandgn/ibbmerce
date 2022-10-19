import React from "react";
import styles from "./OrderHistory.module.scss";

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
                    <th>Sipariş Tarihi</th>
                    <th>Sipariş ID</th>
                    <th>Sipariş Durumu</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>19.10.2022 14:53</td>
                    <td>Brr5dSjt3adYkUPqi00Z</td>
                    <td>
                      <p className="text-blue-500">Bekliyor</p>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>19.10.2022 14:53</td>
                    <td>Brr5dSjt3adYkUPqi00Z</td>
                    <td>
                      <p className="text-green-500">Onaylandı</p>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>19.10.2022 14:53</td>
                    <td>Brr5dSjt3adYkUPqi00Z</td>
                    <td>
                      <p className="text-red-500">Reddedildi</p>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
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
