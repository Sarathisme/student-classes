class AddForeignKey < ActiveRecord::Migration[5.2]
  def change
    add_column :students, :section_id, :bigint, limit: 20
    add_foreign_key :students, :sections
  end
end
