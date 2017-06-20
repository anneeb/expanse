class SpaceSerializer < ActiveModel::Serializer
  attributes :id, :title, :creator
  has_many :nodes
end
