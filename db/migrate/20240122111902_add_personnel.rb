class AddPersonnel < ActiveRecord::Migration[7.0]
  def change
    create_table :personnels do |t|
      t.string :first_name
      t.string :last_name
      t.string :status
      t.references :project

      t.timestamps
    end
  end
end
