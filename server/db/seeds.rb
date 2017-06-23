# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

space = Space.create(title:"My Cool Space", creator:"luis")

godnode = Node.new(title:"God Node", body: "I have no parent")

c1 = Node.new(title: "Child Node 1", body: "I am a child")
c2 = Node.new(title: "Child Node 2", body: "I am also a child")
c3 = Node.new(title: "Child Node 3", body: "I am a child 3")
c4 = Node.new(title: "Child Node 4", body: "I am a child 4")

space.nodes << godnode

space.nodes.push(c1, c2, c3, c4)

godnode.children.push(c1)

c1.children << c2
c2.children.push(c3, c4)
c2.children << c4



space = Space.create(title:"Noah's Awesome Space", creator:"Noah")

godnode = Node.new(title:"I AM GOD", body: "NOTHING OWNS ME")

c1 = Node.new(title: "herp", body: "I AM A SLAVE TO GOD")
c2 = Node.new(title: "derp", body: "I AM A SLAVE TO GOD")
c3 = Node.new(title: "lerp", body: "I AM A SLAVE TO A GOD SLAVE")
c4 = Node.new(title: "merp", body: "I AM A SLAVE TO A GOD SLAVE")

space.nodes << godnode

space.nodes.push(c1, c2, c3, c4)

godnode.children.push(c1, c2)

c1.children << c3

c2.children << c4

space = Space.create(title: "Annee's Nuts Space", creator: "Annee")

gn = Node.new(title: "god")

c1 = Node.new(title: "child")
c2 = Node.new(title: "child")
c3 = Node.new(title: "child")
c4 = Node.new(title: "child")
c5 = Node.new(title: "child")
c6 = Node.new(title: "child")
c7 = Node.new(title: "child")
c8 = Node.new(title: "child")
c9 = Node.new(title: "child")
c10 = Node.new(title: "child")
c11 = Node.new(title: "child")
c12 = Node.new(title: "child")
c13 = Node.new(title: "child")
c14 = Node.new(title: "child")
c15 = Node.new(title: "child")
c16 = Node.new(title: "child")
c17 = Node.new(title: "child")
c18 = Node.new(title: "child")
c19 = Node.new(title: "child")
c20 = Node.new(title: "child")

space.nodes.push(gn, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15, c16, c17, c18, c19, c20)

gn.children.push(c1, c2, c3, c4, c5)

c5.children.push(c6, c7, c8)

c3.children.push(c9, c10)

c4.children.push(c11)

c6.children.push(c12)

c7.children.push(c13, c14, c15)

c14.children.push(c16, c17, c18, c19)

c15.children.push(c20)
