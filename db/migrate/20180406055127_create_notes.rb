class CreateNotes < ActiveRecord::Migration[5.1]
  def change
    create_table :notes do |t|
      t.string :title
      t.text :description
      t.references :classtable, foreign_key: true

      t.timestamps
    end
  end
end
