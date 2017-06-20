class Node < ApplicationRecord
  belongs_to :space
  has_many :children, class_name: "Node", foreign_key: "parent_id"
  belongs_to :parent, class_name: "Node", optional: true
  validates :title, presence: true
  validates :body, presence: true

end
