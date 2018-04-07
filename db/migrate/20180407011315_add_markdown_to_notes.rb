class AddMarkdownToNotes < ActiveRecord::Migration[5.1]
  def change
    add_column :notes, :markdown, :text
  end
end
