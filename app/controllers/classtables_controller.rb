class ClasstablesController < ApplicationController

  def new
    @user = User.find_by(id: params["userId"])
    @user.classtables.create(col: params["activePanel"]["x"], row: params["activePanel"]["y"], title: params["className"], description: params["description"])
    render json: {status: "ok"}
  end

end
