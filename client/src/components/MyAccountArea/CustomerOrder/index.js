import styles from '../MyAccountArea.module.scss';
import ListOrder from './ListOrder';

function CustomerOrder() {
    return (
        <div className={styles.myaccountContent}>
            <h4 className={styles.title}>Orders</h4>
            <div className={`${styles.tableResponsive} ${styles.tablePage}`}>
                <table>
                    <thead>
                        <tr>
                            <th scope='col'>Order Id</th>
                            <th scope='col'>Name Receiver</th>
                            <th scope='col'>Phone Receiver</th>
                            <th scope='col'>Address</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Price</th>
                            {/* <th scope='col'>Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        <ListOrder />
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CustomerOrder