class NodeSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :space_id, :parent_id
  belongs_to :space
  belongs_to :parent, class_name: "Node"
  has_many :children, class_name: "Node", foreign_key: "parent_id"
end
