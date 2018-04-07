class NoteeditsController < ApplicationController
  def new
    byebug
    @user = User.find_by(id: params["userId"])
    @classtable = @user.classtables.find_by(col: params["col"], row: params["row"])
    @note = @classtable.notes.find_by(id: params["noteId"])
    @note["markdown"] = params["markdown"]
    @note.save
    render json: {id: @note.id}
  end
end
