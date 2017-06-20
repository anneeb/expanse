class Space < ApplicationRecord
  has_many :nodes
  validates :title, presence: true
  validates :creator, presence: true
end
