class Node < ApplicationRecord
  belongs_to :space
  has_many :children, class_name: "Node", foreign_key: "parent_id", dependent: :destroy
  belongs_to :parent, class_name: "Node", optional: true
  validates :title, presence: true

  def num_child
    self.children.length
  end

end
