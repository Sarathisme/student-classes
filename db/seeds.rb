# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Section.create([{name: 'Group 2'}, {name: 'Group 3'}])
Student.create([{name: 'Sarath Krishna', email: 'sarath.krishna@gmail.com', gpa: 6.7, section_id: 1},
                          {name: 'Sarath Chandra', email: 'sarath.chandra@gmail.com', gpa: 7.7, section_id: 2}])