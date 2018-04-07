class AddRowToClasstables < ActiveRecord::Migration[5.1]
  def change
    add_column :classtables, :row, :string
  end
end
