class SpaceSerializer < ActiveModel::Serializer
  attributes :id, :title, :creator, :created_at
  has_many :nodes
end
