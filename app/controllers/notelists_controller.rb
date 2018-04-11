class NotelistsController < ApplicationController
  def new

    @user = User.find_by(id: params["userId"])
    @classtable = @user.classtables.find_by(col: params["day"], row: params["period"])
    @note = @classtable.notes.create(title: params["title"], description: params["description"])
    render json: {id: @note.id}
  end

  def destroy
    params["idList"].map { |id| Note.find_by(id: id).delete }
  end
end
