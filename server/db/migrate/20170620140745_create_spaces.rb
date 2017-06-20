class CreateSpaces < ActiveRecord::Migration[5.1]
  def change
    create_table :spaces do |t|
      t.string :title
      t.string :creator

      t.timestamps
    end
  end
end
