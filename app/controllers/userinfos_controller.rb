class UserinfosController < ApplicationController
  def get
    params["userId"]
    @user = User.find_by(id: params["userId"])
    @classtables = @user.classtables
    # @classtable = @user.classtables.find_by(col: params["day"], row: params["period"])
    # @note = @classtable.notes.create(title: params["title"], description: params["description"])
    # render json: {id: @note.id}
    byebug
    jsonClassTable = @classtables.map { |classtable|   { name: classtable.title,  description: classtable.description, col: classtable.col, row: classtable.row, note: classtable.notes} }
    render json: {classtable: jsonClassTable}
  end
end
