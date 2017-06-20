class CreateNodes < ActiveRecord::Migration[5.1]
  def change
    create_table :nodes do |t|
      t.string :title
      t.text :body
      t.references :space, foreign_key: true
      t.references :parent, index: true, foreign_key: true

      t.timestamps
    end
  end
end
