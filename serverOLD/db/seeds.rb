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
c3 = Node.new(title: "Child Node 3", body: "I am a child 3")
c4 = Node.new(title: "Child Node 4", body: "I am a child 4")

space.nodes << godnode

space.nodes.push(c1, c2, c3, c4)

godnode.children.push(c1, c2)

c1.children << c3

c2.children << c4



space = Space.create(title:"My Cool Space 2", creator:"Annee 2")

godnode = Node.new(title:"God Node 2", body: "I have no parent 2")

c1 = Node.new(title: "Child Node 1 - 2", body: "I am a child - 2")
c2 = Node.new(title: "Child Node 2 - 2", body: "I am also a child - 2")
c3 = Node.new(title: "Child Node 3 - 2", body: "I am a child 3 - 2")
c4 = Node.new(title: "Child Node 4 - 2", body: "I am a child 4 - 2")

space.nodes << godnode

space.nodes.push(c1, c2, c3, c4)

godnode.children.push(c1, c2)

c1.children << c3

c2.children << c4
