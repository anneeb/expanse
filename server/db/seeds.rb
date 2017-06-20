# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

space = Space.create(title:"My Cool Space", creator:"Annee")

godnode = Node.new(title:"God Node", body: "I have no parent")

c1 = Node.new(title: "Child Node 1", body: "I am a child")
c2 = Node.new(title: "Child Node 2", body: "I am also a child")

space.nodes << godnode

space.nodes << c1

space.nodes << c2

godnode.children << c1

godnode.children << c2
