class Space < ApplicationRecord
  has_many :nodes, dependent: :destroy
  validates :title, presence: true
  validates :creator, presence: true
end
