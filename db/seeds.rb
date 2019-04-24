# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
U1 = User.find(1).update(buying_power: 50000)

T0 = Transaction.create(user_id: 1, asset_symbol: "NFLX", quantity: 7, price: 65.58, created_at: "2014-08-15")
T1 = Transaction.create(user_id: 1, asset_symbol: "TSLA", quantity: 7, price: 231.77, created_at: "2015-04-28")
T2 = Transaction.create(user_id: 1, asset_symbol: "AMZN", quantity: 1, price: 514.24, created_at: "2015-08-31")
T3 = Transaction.create(user_id: 1, asset_symbol: "GOOG", quantity: 3, price: 631.24, created_at: "2015-09-15")
T4 = Transaction.create(user_id: 1, asset_symbol: "BAC", quantity: 7, price: 17.95, created_at: "2015-11-06")
T5 = Transaction.create(user_id: 1, asset_symbol: "VTI", quantity: 17, price: 112.28, created_at: "2016-09-02")
T6 = Transaction.create(user_id: 1, asset_symbol: "AAPL", quantity: 7, price: 156.10, created_at: "2017-05-17")
T7 = Transaction.create(user_id: 1, asset_symbol: "NVDA", quantity: 3, price: 281.02, created_at: "2018-09-28")
T8 = Transaction.create(user_id: 1, asset_symbol: "AMZN", quantity: 6, price: 1924.05, created_at: "2019-04-23")