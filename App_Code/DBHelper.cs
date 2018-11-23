using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Data.OleDb;

namespace ZBT.DateBase
{
    /// <summary>
    /// Access操作相关扩展
    /// </summary>
    public class DBHelper
    {
        private DBHelper() { }

        /// <summary>
        /// 获得连接对象
        /// </summary>
        /// <returns></returns>
        public static OleDbConnection GetOleDbConnection(string DbPath)
        {
            return new OleDbConnection(DbPath);
        }

        private static void PrepareCommand(OleDbCommand cmd, OleDbConnection conn, string cmdText, params object[] p)
        {
            if (conn.State != ConnectionState.Open)
            conn.Open();
            cmd.Parameters.Clear();
            cmd.Connection = conn;
            cmd.CommandText = cmdText;
            cmd.CommandType = CommandType.Text;
            cmd.CommandTimeout = 30;
            if (p != null)
            {
                foreach (object parm in p)
                    cmd.Parameters.AddWithValue(string.Empty, parm);
            }
        }

        public static DataSet ExecuteDataset(string DbPath, string cmdText, params object[] p)
        {
            DataSet ds = new DataSet();

            OleDbCommand command = new OleDbCommand();

            using (OleDbConnection connection = GetOleDbConnection(DbPath))
            {
                PrepareCommand(command, connection, cmdText, p);

                OleDbDataAdapter da = new OleDbDataAdapter(command);

                da.Fill(ds);
            }

            return ds;
        }

        public static DataRow ExecuteDataRow(string DbPath, string cmdText, params object[] p)
        {
            DataSet ds = ExecuteDataset(DbPath, cmdText, p);
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                return ds.Tables[0].Rows[0];
            return null;
        }

        /// <summary>
        /// 返回受影响的行数
        /// </summary>
        /// <param name="cmdText">a</param>
        /// <param name="commandParameters">传入的参数</param>
        /// <returns></returns>
        public static int ExecuteNonQuery(string DbPath, string cmdText, params object[] p)
        {
            OleDbCommand command = new OleDbCommand();

            using (OleDbConnection connection = GetOleDbConnection(DbPath))
            {
                PrepareCommand(command, connection, cmdText, p);

                return command.ExecuteNonQuery();
            }
        }

        /// <summary> 
        /// 返回SqlDataReader对象 
        /// </summary> 
        /// <param name="cmdText"></param> 
        /// <param name="commandParameters">传入的参数</param> 
        /// <returns></returns> 
        public static OleDbDataReader ExecuteReader(string DbPath, string cmdText, params object[] p)
        {
            OleDbCommand command = new OleDbCommand();

            OleDbConnection connection = GetOleDbConnection(DbPath);

            try
            {
                PrepareCommand(command, connection, cmdText, p);

                OleDbDataReader reader = command.ExecuteReader(CommandBehavior.CloseConnection);

                return reader;
            }
            catch
            {
                connection.Close();

                throw;
            }
        }

        /// <summary> 
        /// 返回结果集中的第一行第一列，忽略其他行或列 
        /// </summary> 
        /// <param name="cmdText"></param> 
        /// <param name="commandParameters">传入的参数</param> 
        /// <returns></returns> 
        public static object ExecuteScalar(string DbPath, string cmdText, params object[] p)
        {
            OleDbCommand cmd = new OleDbCommand();

            using (OleDbConnection connection = GetOleDbConnection(DbPath))
            {
                PrepareCommand(cmd, connection, cmdText, p);
                return cmd.ExecuteScalar();
            }
        }
    }
}
