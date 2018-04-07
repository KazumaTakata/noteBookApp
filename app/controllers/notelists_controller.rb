class NotelistsController < ApplicationController
  def new
    byebug
    @user = User.find_by(id: params["userId"])
    @classtable = @user.classtables.find_by(col: params["day"], row: params["period"])
    @note = @classtable.notes.create(title: params["title"], description: params["description"])
    render json: {id: @note.id}
  end
end
