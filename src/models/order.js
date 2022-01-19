import moment from 'moment';

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
        return moment(this.date).format('MMMM Do YYYY, hh:mm');
    }
}

export default Order;
