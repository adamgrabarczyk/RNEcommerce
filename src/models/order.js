import moment from 'moment';
import 'moment/locale/pl'

class Order {
    constructor(id, items, totalAmount, date, address, delivery, payment, status) {
        this.id = id;
        this.items = items;
        this.totalAmount = totalAmount;
        this.date = date;
        this.address = address;
        this.delivery = delivery;
        this.payment = payment;
        this.status = status;

    }

    get readableDate() {
        moment.locale('pl');
        return moment(this.date).format('D MMMM YYYY, k:m');
    }
}

export default Order;
