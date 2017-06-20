module Api
  module V1
    class NodesController < ApplicationController

      def create
        node = Node.new(params.require(:node).permit(:title,:body,:parent_id,:space_id))
        if node.save
          render json: {
            message: "Successfully created node!",
            status: 200,
            data: Node.last
          }
        else
          render json: {message: node.errors.full_messages, status: 500}
        end
      end

      def show
        render json: Node.find(params[:id])
      end

      def destroy
        Node.find(params[:id]).destroy
        render json: {message: "Successfully deleted node!", status: 200}
      end

    end
  end
end
